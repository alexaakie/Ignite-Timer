import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator, StartCountdownButton, TaskInput, CountdownInput} from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useState } from "react";


const newCycleformValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60),
}) 

// interface NewCycleFormData {
//     task: string
//     minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleformValidationSchema>

export function Home() {
    interface Cycle {
        id: string
        task: string
        minutesAmount: number
    }

    const [Cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm({
        resolver:  zodResolver(newCycleformValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const handleCreateNewCycle = (data: NewCycleFormData) => {
        const id = String(new Date().getTime());
        const newCycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
        };
        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        reset();
      };
      

    const activeCycle = Cycles.find((cycle) => cycle.id == activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em </label>
                    <TaskInput
                    list="task-suggestions"
                    placeholder="Dê um nome ao seu projeto!"
                    id="task"
                    {...register('task')}/>

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                        <option value="Projeto 4"></option>
                    </datalist>
                    <label htmlFor="">durante</label>
                    <CountdownInput
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                    type="number"
                    id="minutesAmount"
                    {...register('minutesAmount', { valueAsNumber: true })}/>

                    <span>minutos</span>
                </FormContainer>
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton
                disabled={isSubmitDisabled}
                type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}