import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import * as FileSaver from "file-saver";

const API_BASE = "https://stunning-space-couscous-4j7qjvvpvq9w3q756-8000.app.github.dev";

export default function LeadBol() {

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [fileName, setFileName] = useState("");

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);
        setLoading(true);
        setMessage("Reading Excel file...");
        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setMessage("Uploading leads and triggering calls...");
            const response = await axios.post(`${API_BASE}/api/upload`, { leads: jsonData });
            console.log("Upload response:", response.data);
            setMessage("Calls initiated successfully.");
        } catch (error) {
            console.error(error);
            setMessage("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    const fetchResults = async () => {
        setLoading(true);
        setMessage("Fetching call results...");
        try {
            const res = await axios.get(`${API_BASE}/api/results`);
            setResults(res.data.results || []);
            setMessage("Results fetched successfully.");
        } catch (err) {
            console.error(err);
            setMessage("Failed to fetch results.");
        } finally {
            setLoading(false);
        }
    };

    const downloadResults = () => {
        const worksheet = XLSX.utils.json_to_sheet(results);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Call Results");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        FileSaver.saveAs(blob, "leadbol_results.xlsx");
    };

    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                fontFamily: "Arial"
            }}
        >

            <h1 style={{ marginBottom: "20px" }}>
                LeadBol AI Call Automation
            </h1>

            <div style={{ marginBottom: "20px" }}>

                <div style={{ marginBottom: "20px" }}>
                    <label
                        style={{
                            display: "inline-block",
                            padding: "12px 18px",
                            background: "#414141",
                            color: "white",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 500,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                        }}
                    >
                        Upload Excel File (Leads with Phone Numbers)
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileUpload}
                            style={{ display: "none" }}
                        />
                    </label>
                </div>

                {fileName && (
                    <p style={{ fontSize: "14px", marginTop: "10px" }}>
                        Uploaded file: <b>{fileName}</b>
                    </p>
                )}

            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>

                <button
                    onClick={fetchResults}
                    style={{
                        padding: "10px 16px",
                        background: "#414141",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Get Results
                </button>

                <button
                    onClick={downloadResults}
                    style={{
                        padding: "10px 16px",
                        background: "#414141",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Download Excel
                </button>

            </div>

            {loading && (
                <p style={{ marginTop: "20px" }}>
                    Processing...
                </p>
            )}

            {message && (
                <p style={{ marginTop: "10px", color: "#555" }}>
                    {message}
                </p>
            )}

            {results.length > 0 && (

                <div style={{ marginTop: "30px" }}>

                    <h3>Call Results</h3>

                    <table
                        border={1}
                        cellPadding={8}
                        style={{
                            marginTop: "10px",
                            borderCollapse: "collapse",
                            width: "100%"
                        }}
                    >

                        <thead>
                            <tr>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Summary</th>
                            </tr>
                        </thead>

                        <tbody>

                            {results.map((r, i) => (

                                <tr key={i}>
                                    <td>{r.phone_number}</td>
                                    <td>{r.status}</td>
                                    <td>{r.summary || "-"}</td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}