
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Settings, RotateCcw } from 'lucide-react';

const ScenarioCard = ({ title, description, icon: Icon, color, to }: any) => (
    <Link
        to={to}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] transition-all group"
    >
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
            <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-primary-purple transition-colors">
            {title}
        </h3>
        <p className="text-gray-600 text-sm">
            {description}
        </p>
    </Link>
);

export const Home: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto mt-8 space-y-6">
                <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 leading-tight">
                    Descubre los secretos de la <span className="text-primary-purple">Lógica Matemática</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Únete a una aventura interactiva para entender cómo las matemáticas hablan de sí mismas y descubre el famoso Teorema de Incompletitud de Gödel.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Link
                        to="/scenarios"
                        className="bg-primary-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Comenzar Aventura
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Scenarios Preview */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Tus Misiones</h2>
                    <Link to="/scenarios" className="text-primary-purple font-semibold hover:underline">Ver todas</Link>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <ScenarioCard
                        title="El Detective Lógico"
                        description="Distingue entre lo que es verdadero y lo que puedes demostrar."
                        icon={Search}
                        color="bg-primary-blue"
                        to="/scenarios/detective"
                    />
                    <ScenarioCard
                        title="La Fábrica de Verdades"
                        description="Construye teoremas usando máquinas de inferencia lógica."
                        icon={Settings}
                        color="bg-primary-orange"
                        to="/scenarios/factory"
                    />
                    <ScenarioCard
                        title="Laboratorio de Paradojas"
                        description="Explora bucles extraños y frases que se contradicen."
                        icon={RotateCcw}
                        color="bg-primary-yellow"
                        to="/scenarios/paradox"
                    />
                </div>
            </section>
        </div>
    );
};
