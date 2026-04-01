export function EventAgenda({ agendaItems } : { agendaItems : string[] }) {
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {agendaItems?.map((agendaItem) => {
                    return <li key={agendaItem}>{agendaItem}</li>
                })}
            </ul>
        </div>
    )
}