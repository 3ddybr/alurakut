import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';
function ProfileSideBar (props) {
  
  return (
    <Box >
      <img src={`https://github.com/${props.githubUser}.png `}style={{borderRadius:'8px'}}/>
    </Box>
  )
}
export default function Home() {
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
      </div>
      <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Pessoas da Comunidade ({usersFavoritos.length})
          </h2>
          <ul>
        {usersFavoritos.map((itemAtual)=> {
          return (
            // <li>{itemAtual}</li>
            <li>
            <a href={'users/${itemAtual}'} key={itemAtual}>
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
