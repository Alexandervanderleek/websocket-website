import { Navigate } from "react-router-dom";
const GoAhead = ({ isLoggedIn, children }) => {
if (isLoggedIn) {
    return <Navigate to="/play" replace />;
}
    return children;
};
export default GoAhead;