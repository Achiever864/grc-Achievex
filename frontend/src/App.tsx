import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import ToolBox from "./pages/tool-box";
import Hub from "./pages/hub";
import Voices from "./pages/voice";
import LearningHub from "./pages/learning-hub";
import PartnerPortal from "./pages/partner-portal";
import FindSupport from "./pages/find-support";
import AboutPage from "./pages/about";
import Newsletter from "./components/ui/newsletter";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/knowledge-hub" component={Hub} />
      <Route path="/toolbox" component={ToolBox} />
      <Route path="/find-support" component={FindSupport} />
      <Route path="/voices" component={Voices} />
      <Route path="/learning-hub" component={LearningHub} />
      <Route path="/partner-portal" component={PartnerPortal} />
    </Switch>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Router />
    </>
  );
}
