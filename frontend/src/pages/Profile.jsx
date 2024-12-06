import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';

export default function Profile() {
	const { user } = useAuth();
	return (
		<>
			<div className="text-3xl font-bold text-slate-600 mb-4">Meu Perfil</div>
            
            <div className='flex w-full p-5'>
                <div className="block w-full p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                    <h5 className="my-2 text-2xl font-bold tracking-tight">
                        Nome: {user.name}
                    </h5>
                    <p className="font-normal text-gray-700">E-mail: {user.email}</p>
                    <p className="font-normal text-gray-700">
                        Data de Cadastro: {moment(user.created_at).format('DD/MM/YYYY')}
                    </p>
                </div>
            </div>
		</>
	);
}