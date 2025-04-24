import { Cardapio } from "../pages/Cardapio/Cardapio";
import { NotFound } from "../pages/NotFound/NotFound";
import { Route, Switch } from "wouter";


export const Router: React.FC = () => {
  return(
    <Switch>
        <Route path="/" component={() => <NotFound></NotFound>} />
        <Route path="/:id" component={() => <Cardapio></Cardapio>} />
        <Route>404 - Página não encontrada</Route>
    </Switch>
  )
}