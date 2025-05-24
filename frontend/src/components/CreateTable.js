import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const CreateTable = () => {
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([{ name: '', type: '' }]);
    const navigate = useNavigate();

    const handleAddColumn = () => {
        setColumns([...columns, { name: '', type: '' }]);
    };

    const handleInputChange = (index, event) => {
        const newColumns = [...columns];
        newColumns[index][event.target.name] = event.target.value;
        setColumns(newColumns);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/create-table/', {
                table_name: tableName,
                columns: columns
            });
            alert(response.data.message);
            navigate('/'); // Redirect to dashboard after success
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Create a New Table</h2>
            <form onSubmit={handleSubmit}>
                <label>Table Name:</label>
                <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    required
                />
                <br />
                <h3>Columns:</h3>
                {columns.map((col, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Column Name"
                            value={col.name}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                        />
                        <input
                            type="text"
                            name="type"
                            placeholder="Data Type"
                            value={col.type}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                        />
                        <br />
                    </div>
                ))}
                <button type="button" onClick={handleAddColumn}>Add Column</button>
                <br />
                <button type="submit">Create Table</button>
            </form>
        </div>
    );
};

export default CreateTable;
