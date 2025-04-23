import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../connection';
import { onAuthStateChanged } from 'firebase/auth';

export default function Private({ children }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setSigned(true);
            } else {
                setSigned(false);
            }
            setLoading(false);
        });

        return () => unsub(); // Remove o listener quando desmontar
    }, []);

    if (loading) {
        return <div>Carregando...</div>; // ou null
    }

    if (!signed) {
        return <Navigate to="/" />;
    }

    return children;
}
