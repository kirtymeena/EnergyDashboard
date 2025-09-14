import "./sites.scss"

function Sites() {
    const sites = [
        { id: 1, name: "Building", status: "Completed", date: "Jul 12th 2024", code: "Power: 0.16KW", icon: "👕" },
        { id: 2, name: "HQ", status: "Pending", date: "Jul 12th 2024", code: "Power: 0.12KVA", icon: "🎮" },
        { id: 3, name: "Office", status: "Pending", date: "Jul 12th 2024", code: "28.93KVA", icon: "🧥" },
        { id: 4, name: "Outpost", status: "Completed", date: "Jul 12th 2024", code: "24.4KW", icon: "📱" },
        { id: 5, name: "Resturant", status: "Completed", date: "Jul 12th 2024", code: "2.10KVA", icon: "☕" },
        { id: 6, name: "Building", status: "Completed", date: "Jul 12th 2024", code: "Power: 0.16KW", icon: "👕" },
        { id: 6, name: "Building", status: "Completed", date: "Jul 12th 2024", code: "Power: 0.16KW", icon: "👕" },
        // { id: 6, name: "Starbucks", status: "Completed", date: "Jul 12th 2024", code: "0JWEJS7ISNC", icon: "🥤" },
    ];
    return (
        <div className="transaction-card">
            <div className="card-header">
                <h3>Sites</h3>
                <span className="menu">⋮</span>
            </div>

            <ul className="transaction-list">
                {sites.map((tx) => (
                    <li key={tx.id} className="transaction-item">
                        <div className="icon">{tx.icon}</div>
                        <div className="details">
                            <span className="name">{tx.name}</span>
                            <span className="date">{tx.date}</span>
                        </div>
                        <div className="status">
                            <span className={tx.status.toLowerCase()}>{tx.status}</span>
                            <span className="code">{tx.code}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sites