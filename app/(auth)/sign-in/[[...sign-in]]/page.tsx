import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return (
    <div className="h-full flex justify-center items-center">
        <SignIn/>
    </div>
    );
}
 
export default SignInPage;