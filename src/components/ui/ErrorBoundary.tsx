import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">¡Algo salió mal!</h1>
                    <p className="mb-4">Se ha producido un error inesperado.</p>
                    <div className="bg-black/50 p-4 rounded border border-red-900/50 max-w-lg overflow-auto">
                        <code className="text-xs text-red-300 font-mono">
                            {this.state.error && this.state.error.toString()}
                        </code>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold"
                    >
                        Recargar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
