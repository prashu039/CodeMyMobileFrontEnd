import { BrowserRouter, Switch, Route} from 'react-router-dom'
import UserList from './component/UserList'

function App() {
  return (

    <BrowserRouter>
          <div className="App">
             <Switch>
            <Route exact path="/" component={UserList} />
            {/* <Route exact path="/friends-list" component={UserDetails}/> */}
            </Switch>
          </div>
    </BrowserRouter>
  );
}

export default App;
