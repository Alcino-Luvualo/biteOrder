import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { subscribeToOrders, createOrder, updateOrderStatus } from "../services/orderService";
import { useAuth } from "../hooks/useAuth";
import { Pedido } from "../types";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [mesa, setMesa] = useState("");
    const [prato, setPrato] = useState("");
    const [tipo, setTipo] = useState<"comum" | "expresso">("comum");
    const [loading, setLoading] = useState(false);

    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // Contadores
    const pedidosPendentes = pedidos.filter((p) => p.status === "pendente").length;
    const pedidosEmPreparo = pedidos.filter((p) => p.status === "em_preparo").length;
    const pedidosComuns = pedidos.filter(
        (p) => p.prioridade === "comum" && p.status !== "servido"
    ).length;
    const pedidosExpressos = pedidos.filter(
        (p) => p.prioridade === "expresso" && p.status !== "servido"
    ).length;

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        // Escutar mudanças nos pedidos
        const unsubscribe = subscribeToOrders((data) => {
            setPedidos(data);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    const adicionarPedido = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mesa || !prato) return;

        setLoading(true);
        try {
            const novoPedido: Omit<Pedido, "id"> = {
                mesa: mesa,
                prato: prato,
                prioridade: tipo,
                status: "pendente",
                timestamp: new Date().toISOString(),
                userId: user?.uid || "anonymous",
            };

            await createOrder(novoPedido);
            playNotificationSound();

            // Limpar formulário
            setMesa("");
            setPrato("");
            setTipo("comum");
        } catch (error: any) {
            console.error("Erro ao adicionar pedido:", error);
            alert("Erro ao adicionar pedido: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const atualizarStatus = async (pedidoId: string, novoStatus: Pedido["status"]) => {
        try {
            await updateOrderStatus(pedidoId, novoStatus);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    const playNotificationSound = () => {
        const audio = new Audio("/notification.mp3");
        audio.play().catch((e) => console.log("Erro ao tocar som:", e));
    };

    const pedidosComunsList = pedidos
        .filter((p) => p.prioridade === "comum" && p.status !== "servido")
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const pedidosExpressosList = pedidos
        .filter((p) => p.prioridade === "expresso" && p.status !== "servido")
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (authLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>A carregar...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>BiteOrder</h1>
                    {user && (
                        <div className="user-info">
                            <span className="user-name">
                                Olá, {user.displayName || user.email?.split("@")[0] || "Usuário"}
                            </span>
                        </div>
                    )}
                    <div className="counters">
                        <span className="counter-item">
                            <strong>{pedidosPendentes}</strong> Pendentes
                        </span>
                        <span className="counter-item">
                            <strong>{pedidosEmPreparo}</strong> Em Preparo
                        </span>
                    </div>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    Sair
                </button>
            </header>

            <div className="order-form-container">
                <form onSubmit={adicionarPedido} className="order-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Mesa</label>
                            <input
                                type="text"
                                value={mesa}
                                onChange={(e) => setMesa(e.target.value)}
                                placeholder="Número da mesa"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Prato</label>
                            <input
                                type="text"
                                value={prato}
                                onChange={(e) => setPrato(e.target.value)}
                                placeholder="Nome do prato"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipo</label>
                            <select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value as "comum" | "expresso")}
                            >
                                <option value="comum">Comum</option>
                                <option value="expresso">Expresso</option>
                            </select>
                        </div>
                        <button type="submit" className="add-order-btn" disabled={loading}>
                            {loading ? "Adicionando..." : "Adicionar Pedido"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="orders-container">
                <div className="orders-column fifo-column">
                    <div className="column-header">
                        <h2>Pedidos Comuns (FIFO)</h2>
                        <span className="order-count">{pedidosComuns}</span>
                    </div>
                    <div className="column-description">
                        <small>Mais antigos por cima → Primeiro a ser servido</small>
                    </div>
                    <div className="orders-list">
                        <AnimatePresence>
                            {pedidosComunsList.map((pedido) => (
                                <div key={pedido.id} className={`order-card ${pedido.status}`}>
                                    <div className="order-info">
                                        <h3>Mesa {pedido.mesa}</h3>
                                        <p>{pedido.prato}</p>
                                        <span className="order-time">
                                            {new Date(pedido.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className="order-actions">
                                        {pedido.status === "pendente" && (
                                            <button
                                                onClick={() => atualizarStatus(pedido.id, "em_preparo")}
                                                className="action-btn start-btn"
                                            >
                                                Começar
                                            </button>
                                        )}
                                        {pedido.status === "em_preparo" && (
                                            <button
                                                onClick={() => atualizarStatus(pedido.id, "servido")}
                                                className="action-btn serve-btn"
                                            >
                                                Servir
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="orders-column lifo-column">
                    <div className="column-header">
                        <h2>Pedidos Expressos (LIFO)</h2>
                        <span className="order-count">{pedidosExpressos}</span>
                    </div>
                    <div className="column-description">
                        <small>Mais recentes por cima → Prioridade máxima</small>
                    </div>
                    <div className="orders-list">
                        <AnimatePresence>
                            {pedidosExpressosList.map((pedido) => (
                                <div
                                    key={pedido.id}
                                    className={`order-card ${pedido.status} expresso`}
                                >
                                    <div className="order-info">
                                        <h3>Mesa {pedido.mesa}</h3>
                                        <p>{pedido.prato}</p>
                                        <span className="order-time">
                                            {new Date(pedido.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className="order-actions">
                                        {pedido.status === "pendente" && (
                                            <button
                                                onClick={() => atualizarStatus(pedido.id, "em_preparo")}
                                                className="action-btn start-btn"
                                            >
                                                Começar
                                            </button>
                                        )}
                                        {pedido.status === "em_preparo" && (
                                            <button
                                                onClick={() => atualizarStatus(pedido.id, "servido")}
                                                className="action-btn serve-btn"
                                            >
                                                Servir
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
