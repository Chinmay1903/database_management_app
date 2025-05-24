import React, { useEffect, useState } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import api from '../api/api';

const Sidebar = ({ onSelectTable, runEffect }) => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTables();
    }, [runEffect]);
    
    const fetchTables = async () => {
        try {
            const response = await api.get('tables/');
            setTables(response.data.tables);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tables", error);
            setLoading(false);
        }
    };
    
    return (
        <div style={{ height: '100vh', backgroundColor: '#f8f9fa', padding: '10px' }}>
            <h5 className="text-center">Tables</h5>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ListGroup>
                    {tables.map((table, index) => (
                        <ListGroup.Item 
                            key={index} 
                            action 
                            onClick={() => onSelectTable(table)}
                        >
                            {table}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default Sidebar;
