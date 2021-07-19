import nookies from 'nookies';
import jwt from 'jsonwebtoken'
import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';
import { useEffect, useState } from 'react';


function ProfileSideBar (props) {  
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png `}style={{borderRadius:'8px'}}/>
      <hr/>
      <p>
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>

    </Box>
  )
}

function ProfileRelationsBox (props) {
  return (
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            {props.title} ({props.items.length})
          </h2>
        <ul>
            {/* {seguidores.map((itemAtual)=> {
             return (
            // <li>{itemAtual}</li>
            <li key={itemAtual}>
              <a href={'http://github.com/${itemAtual}.png'} >
              <img src={`http://placehold.it/300x300 `}/>
                <img src={itemAtual.image}/>
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
          })} */}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;

  const [comunidades, setComunidades] =useState([]);
  const usersFavoritos = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  //Pegar o array dos seguidores do github
  const [seguidores, setSeguidores]= useState([]);
    useEffect(function() {
      //GET
      fetch('https://api.github.com/users/3ddybr/followers')
      .then (function (respostaDoServidor) {
        return respostaDoServidor.json();
    })
    .then(function (respostaCompleta){
      setSeguidores(respostaCompleta);
    })
    //api GragphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers:{
        'Authorization': 'df339378634a49fc1274150c382921',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({'query': `query {        
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
          _status
          _firstPublishedAt
        }
      
        _allCommunitiesMeta {
          count
        }
      }`})
    })
    .then ((response) => response.json())
    .then((respostaCompleta)=> {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities
      setComunidades(comunidadesVindasDoDato)
      // console.log(comunidadesVindasDoDato)

    })
    },[])

  //ate aqui

  return (
    <>
    <AlurakutMenu/>
    <MainGrid>
      <div className="profileArea" styled={{ gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea" styled={{ gridArea: 'welcomeArea'}}>
        <Box >
          <h1 className="title">
          Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subTitle">Oque voce deseja fazer</h2>

          <form onSubmit={function handleSubmit(e){
            e.preventDefault();
            const dadosForm = new FormData(e.target);

            const comunidade = {
              title: dadosForm.get('title'),
              imageUrl: dadosForm.get('image'),
              creatorSlug: githubUser
            }

            fetch('/api/comunidades',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(comunidade)
            }).then(async (response) =>{
              const dados =await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })

            
            // console.log(setComunidades)
          }}>

            <div>
            <input 
            placeholder= "Qual vai ser o nome da sua comunidade?"
            name="title"
            aria-label="Qual vai ser o nome da sua comunidade?"
            type="text"
            />
            </div>

            <div>
            <input 
            placeholder= "Coloque uma URL pra usar de capa.?"
            name="image"
            aria-label="Coloque uma URL pra usar de capa."
            type="text"
            />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea'}}>
          {/* {seguidores} */}

          <ProfileRelationsBox title="Seguidores" items={seguidores}/>       


        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
        <ul>
            {comunidades.map((itemAtual)=> {
             return (
            // <li>{itemAtual}</li>
            <li key={itemAtual.id}>
            <a href={`users/${itemAtual.title}`} >
              {/* <img src={`http://placehold.it/300x300 `}/> */}
              <img src={itemAtual.imageUrl}/>
              <span>{itemAtual.title}</span>
            </a>
            </li>
          )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Pessoas da Comunidade ({usersFavoritos.length})
          </h2>
          <ul>
            {usersFavoritos.map((itemAtual)=> {
             return (
            // <li>{itemAtual}</li>
            <li  key={itemAtual}>
            <a href={'users/${itemAtual}'}>
              <img src={`https://github.com/${itemAtual}.png `}/>
              <span>{itemAtual}</span>
            </a>
            </li>
          )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box >
          Comunidades
        </Box>
      </div>

    </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  // console.log ('Cookies',jwt.decode(token))

  const {isAuthenticated} = await fetch('http://localhost:3000/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())
console.log('isAuthenticated', isAuthenticated)
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const {githubUser} = jwt.decode(token);

  return {
    props: {
      githubUser
    },
  }
}
