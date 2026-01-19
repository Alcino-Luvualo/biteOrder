import {
    collection,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    query,
    orderBy,
    FirestoreError,
    QuerySnapshot,
    Unsubscribe
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Pedido } from "../types";

const COLLECTION_NAME = "pedidos";

export const subscribeToOrders = (
    onData: (data: Pedido[]) => void,
    onError?: (error: FirestoreError) => void
): Unsubscribe => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("timestamp", "asc"));

    return onSnapshot(
        q,
        (snapshot: QuerySnapshot) => {
            const pedidos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Pedido[];
            onData(pedidos);
        },
        (error) => {
            console.error("Erro ao carregar pedidos (ordenado):", error);
            // Fallback: tenta carregar sem ordenação se falhar (ex: falta de índice)
            if (onError) onError(error);

            // Nota: Idealmente o fallback deveria ser tratado separadamente ou corrigido o índice no Firebase.
            // Mas mantendo a lógica original:
            const simpleQuery = collection(db, COLLECTION_NAME);
            onSnapshot(simpleQuery, (snapshot) => {
                const pedidos = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Pedido[];
                onData(pedidos);
            });
        }
    );
};

export const createOrder = async (pedido: Omit<Pedido, "id">) => {
    return addDoc(collection(db, COLLECTION_NAME), pedido);
};

export const updateOrderStatus = async (id: string, status: Pedido["status"]) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, { status });
};
