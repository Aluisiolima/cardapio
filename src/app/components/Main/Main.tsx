
type MainProps = {
    children: React.ReactNode;
}
export const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <div id="container-area">
            { children}
        </div>
    );
}