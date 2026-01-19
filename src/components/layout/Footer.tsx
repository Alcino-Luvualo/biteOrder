import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/home.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>BiteOrder</h3>
                    <p>Entregas rápidas e Organizadas.</p>
                </div>
                <div className="footer-section">
                    <h4>Links Úteis</h4>
                    <ul>
                        <li>
                            <Link to="/sobre">Sobre Nós</Link>
                        </li>
                        <li>
                            <Link to="/contactos">Contactos</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contactos</h4>
                    <p>Email: alcinoluvualo@gmail.com</p>
                    <p>Telefone: +244 948 736 226</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} BiteOrder. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
