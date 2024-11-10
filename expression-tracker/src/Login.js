import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate('/home'); 
    };

    return (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Log in</h1>
                <p className="text-sm text-gray-400">Log in to access your account</p>
            </div>
            <form noValidate="" action="" className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                        </div>
                        <input type="password" name="password" id="password" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button 
                            type="button" 
                            className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900" 
                            onClick={handleClick}
                        >
                            Log in
                        </button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-400">Don't have an account yet?
                        <a rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Sign up</a>.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
