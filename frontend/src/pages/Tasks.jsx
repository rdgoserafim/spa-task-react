import { useAuth } from '../contexts/AuthContext';
import axios from "../axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import Select from "react-select";

export default function Tasks() {
    const { headers } = useAuth();

    const [tasks, _setTaks ] = useState([])
    const [error, setError] = useState(null);
    const [iTask, _setITask] = useState(null);

    Modal.setAppElement('#root');

    const [modalIsOpen, setIsOpen] = useState(false);
    const togleModal = () => {
        setIsOpen(!modalIsOpen)
        if(!modalIsOpen){
            _setITask(null)
        }
    }

    const loadtasks = async () => {
        axios
        .get('/tasks', headers() )
        .then((response) => {
            _setTaks(response.data)
        })
    }
    useEffect(() => {
        axios
            .get('/tasks', headers() )
            .then((response) => {
                _setTaks(response.data)
            })
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, status } = e.target.elements;
        const body = {
            title: title.value,
            description: description.value,
            status: status.value,
        };

        let resp = null

        try {
            if(iTask){
                resp = await axios.patch('/tasks/' + iTask.id, body, headers() );
            }else{
                resp = await axios.post('/tasks', body, headers() );
            }
            
            console.log(resp)
            if (resp.status === 201 ) {
                togleModal()
                loadtasks()
            }
        } catch (error) {
            setError(error);
        }
	};

    const handlerDelete = async () => {
        console.log(iTask)

        try{
            const resp = await axios.delete('/tasks/' + iTask.id, headers() );
            if (resp.status === 204 ) {
                togleModal()
                loadtasks()
            }
        }catch (error) {
            setError(error);
        }
    }

    const options = [
        { value: "Pendente", label: "Pendente" },
        { value: "Em progresso", label: "Em progresso" },
        { value: "Concluida", label: "Concluida" },
    ];

    const getColor = (status) => {
        switch(status){
            case 'Pendente':
                return 'bg-gray-300 rounded-md p-2 border'
            case 'Em progresso':
                return 'bg-amber-500 rounded-md p-2 border'
            case 'Concluida':
                return 'bg-green-500 rounded-md p-2 border'
        }
    }

	return (
		<>
			<div className="text-3xl font-bold text-slate-600 mb-4">Tarefas</div>
            <div className='flex w-full justify-end'>
                <button onClick={togleModal} className="px-4 py-2 text-white bg-slate-600 rounded-lg shadow-xl hover:bg-slate-700">
                    Adicionar Tarefa
                </button>
            </div>
            
            <div className='flex flex-col gap-y-2 w-full p-10'>
                {tasks.map((task) => {
                    return (
                        <div key={task.id} className="flex flex-col sm:flex-row items-center justify-start sm:justify-between w-full px-3 py-2 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                            <div className='flex flex-col w-full'>
                                <div className='mt-2 flex justify-between w-full'>
                                    <span className={getColor(task.status)}>{task.status}</span>
                                    <button onClick={()=>{_setITask(task); setIsOpen(true)}} className="px-4 py-2 text-white bg-slate-600 rounded-lg shadow-xl hover:bg-slate-700">Editar</button>
                                </div>
                                <h5 className="my-2">
                                    <span className=' text-2xl font-bold tracking-tight'>{task.title}</span>
                                    <p>{task.description}</p>
                                </h5>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={togleModal}
                className='absolute top-1/4 left-1/3 w-[33vw] flex flex-col shadow-lg rounded-lg bg-white p-5'
            >
                
                <div className='flex w-full justify-between mb-3'>
                    <h2 className='font-bold'>{iTask ? 'Editar Tarefa' : 'Adicionar nova Tarefa'}</h2>
                    <button onClick={togleModal}>x</button>
                </div>
                
                <form
                    className="space-y-4 md:space-y-6"
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}>
                    <div className='p-6'>
                        <label>
                            Título
                            <input type='text' name='title' defaultValue={iTask ? iTask.title : null}  className="w-full rounded-lg p-2 border border-gray-200 shadow-sm" />
                        </label>
                        <label>
                            Descrição
                            <textarea name='description' defaultValue={iTask ? iTask.description : null} className="w-full rounded-lg p-2 border border-gray-200 shadow-sm" />
                        </label>
                        <label>
                            Status
                            <Select
                                className="w-full rounded-lg p-2 border border-gray-200 shadow-sm"
                                name="status"
                                value={options.value}
                                options={options}
                                defaultValue={iTask ? options.find( s => s.value == iTask.status ) : options[0]}
                            />
                        </label>
                    </div>

                    {error && (
                        <div
                            className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert">
                            <svg
                                aria-hidden="true"
                                className="flex-shrink-0 inline w-5 h-5 mr-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>{error}</div>
                        </div>
                    )}

                    <div className='flex justify-between w-full'>
                        <button type="button" onClick={togleModal} className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
                            Fechar
                        </button>
                        <button type="button" onClick={handlerDelete} className="px-4 py-2 text-slate-600 bg-red-300 rounded-lg hover:bg-slate-200">
                            Excluir
                        </button>
                        <button type="submit"className="px-4 py-2 text-white bg-slate-600 rounded-lg hover:bg-slate-700">
                            {iTask ? 'Salvar' : 'Adicionar'}
                        </button>
                    </div>
                </form>
            </Modal>
		</>
	);
}