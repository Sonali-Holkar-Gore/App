import {Route, Switch} from 'react-router-dom'

import Home from './Components/Home'
import Header from './Components/Header'

import CourseDetailsItem from './Components/CourseDetailsItem'

import NotFound from './Components/NotFound'

import './App.css'

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetailsItem} />
      <Route component={NotFound} />
    </Switch>
  </div>
)
export default App
