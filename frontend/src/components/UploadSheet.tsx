import * as XLSX from "xlsx";
import axios from "axios";

export default function UploadSheet(){
    const handleFileUpload = async (e: any)=>{
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData);
        try{
            const response = await axios.post("https://stunning-space-couscous-4j7qjvvpvq9w3q756-8000.app.github.dev/api/upload", {leads: jsonData});
            console.log("Response data:", response.data);
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };
    return (
        <div style={{padding:"40px"}}>
            <h1>Bolna void lead caller</h1>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
    );
}