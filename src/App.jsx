import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import TemplatesPage from './components/TemplatesPage';
import BiodataForm from './components/BiodataForm';
import BiodataPreview from './components/BiodataPreview';

function App() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [biodataData, setBiodataData] = useState(null);

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    const handleFormSubmit = (data) => {
        setBiodataData(data);
    };

    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/templates"
                            element={
                                <TemplatesPage
                                    onSelectTemplate={handleTemplateSelect}
                                />
                            }
                        />
                        <Route
                            path="/form"
                            element={
                                <BiodataForm
                                    onSubmit={handleFormSubmit}
                                    selectedTemplate={selectedTemplate}
                                />
                            }
                        />
                        <Route
                            path="/preview"
                            element={
                                biodataData ? (
                                    <BiodataPreview
                                        data={biodataData}
                                        template={selectedTemplate}
                                    />
                                ) : (
                                    <Navigate to="/form" replace />
                                )
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;