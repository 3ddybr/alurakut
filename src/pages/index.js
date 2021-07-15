import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';
import { useState } from 'react';


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

export default function Home() {

  const [comunidades, setComunidades] =useState([{
    id: 'asdasdasd',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = '3ddybr';
  const usersFavoritos = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

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
              id: new Date().toISOString,
              title: dadosForm.get('title'),
              image: dadosForm.get('image')
            }

            const comunidadesAtualizadas = [...comunidades, comunidade];
            setComunidades(comunidadesAtualizadas)
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
        <ProfileRelationsBoxWrapper>
        <ul>
            {comunidades.map((itemAtual)=> {
             return (
            // <li>{itemAtual}</li>
            <li key={itemAtual.id}>
            <a href={'users/${itemAtual.title}'} >
              {/* <img src={`http://placehold.it/300x300 `}/> */}
              <img src={itemAtual.image}/>
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
