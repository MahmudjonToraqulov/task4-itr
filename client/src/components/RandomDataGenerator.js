import React, { useState } from 'react';
import axios from 'axios';
import GenerateSeed from './GenerateSeed';
import GeneratorTable from './GeneratorTable';

const RandomDataGenerator = () => {
    const [region, setRegion] = useState('');
    const [errors, setErrors] = useState(0);
    const [seed, setSeed] = useState('');
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async (pageNum) => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3000/generate', {
                region,
                errors,
                seed,
                page: pageNum,
                limit: 10,
            });
            setData((prevData) => [...prevData, ...response.data]);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateRandomSeed = async () => {
        try {
            const response = await axios.get('http://localhost:3000/random-seed');
            setSeed(response.data.seed);
        } catch (error) {
            console.error('Error generating random seed:', error);
        }
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight && !isLoading) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadData(nextPage);
        }
    };

    const handleGenerate = async () => {
        setData([]);
        setPage(1);
        await loadData(1);
    };

    const exportToCSV = () => {
        const csvRows = [];
        const headers = ['#', 'UUID', 'Name', 'Address', 'Phone'];
        csvRows.push(headers.join(','));

        data.forEach((item, index) => {
            const row = [
                index + 1,
                item.uuid,
                item.name,
                item.address,
                item.phone,
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated_data.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container mt-4">
            <div className="form-group d-flex align-items-center mb-3 ">
                <div className="input-group mr-2" >
                    <select
                        className="form-control"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        <option value="">Select Language</option>
                        <option value="en">English</option>
                        <option value="pl">Poland</option>
                        <option value="de">Deutsch</option>
                    </select>
                </div> 
                <div className="input-group mr-2">
                    <input
                        type="range"
                        className="slide mx-1"
                        min="0"
                        max="10"
                        step="0.25"
                        value={errors}
                        onChange={(e) => setErrors(e.target.value)}
                    /> 
                    <input
                        type="number"
                        className="form-control mx-1"
                        placeholder="Error Count"
                        min="0"
                        max="1000"
                        value={errors}
                        onChange={(e) => setErrors(e.target.value)}
                        inputMode="decimal"
                    />
                </div>

                <GenerateSeed seed={seed} setSeed={setSeed} generateRandomSeed={generateRandomSeed} />

                <div >
                    <button
                        className="btn btn-primary generate-btn mx-1"
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>
                </div>

                
            </div>
            <GeneratorTable handleScroll={handleScroll} data={data} isLoading={isLoading} />
            <div className='position-absolute' style={{ 'right': '20px', 'bottom': '30px' }}>
                    <button
                        className="btn btn-success export-btn mx-1"
                        onClick={exportToCSV}
                    >
                        Export CSV
                    </button>
            </div>
        </div>
    );
};

export default RandomDataGenerator;
