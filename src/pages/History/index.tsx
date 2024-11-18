import { HistoryContainer, HistoryList, StatusSpan } from "./styles";

export function History() {
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Tarefa
                            </th>
                            <th>
                                Duração
                            </th>
                            <th>
                                Inicio
                            </th>
                            <th>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 Minutos</td>
                            <td>Há dois meses</td>
                            <td><StatusSpan statusColor="yellow">Em andamento</StatusSpan></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 Minutos</td>
                            <td>Há dois meses</td>
                            <td><StatusSpan statusColor="green">Concluido</StatusSpan></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 Minutos</td>
                            <td>Há dois meses</td>
                            <td><StatusSpan statusColor="red">Incompleto</StatusSpan></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 Minutos</td>
                            <td>Há dois meses</td>
                            <td><StatusSpan statusColor="green">Concluido</StatusSpan></td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}