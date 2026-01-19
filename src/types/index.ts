export interface Pedido {
    id: string;
    mesa: string;
    prato: string;
    prioridade: 'comum' | 'expresso';
    status: 'pendente' | 'em_preparo' | 'servido';
    timestamp: string;
    userId: string;
}

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
}
