import {SiteClient} from 'datocms-client'

export default async function recebedorDeRequest(req, res) { 
    if (req.method === 'POST'){
        const TOKEN ='c1ad3036392b4b6c6589c897fbc847';
        const client = new SiteClient(TOKEN);
    
    
        const registroCriado = await client.items.create({
            
            itemType:"971840",
            ...req.body,
            // title: "Comunidade de Teste",
            // imageUrl:"https://github.com/3ddybr.png",
            // creatorSlug:"3ddybr"
        })
    
        // console.log(TOKEN);
        res.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado
        })
        return;
    }

    res.status(404).json({
        message:'Ainda nao temos nada no GET, mas no POST tem'
    })
}