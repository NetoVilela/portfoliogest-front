import { useParams } from 'react-router-dom';

const PageFormPortfolio = () => {
    const parametros = useParams();
    console.log(parametros);

    return (
        <>
            <h1>{parametros.id ? 'Edição de ' : 'Cadastro de '} portólio</h1>
        </>
    );
};

export default PageFormPortfolio;
