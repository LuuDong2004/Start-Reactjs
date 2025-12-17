import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";


function DisplayList() {
    const [listChuot, setListChuot] = useState(["Chuột nhắt", "Chuột đồng", "Chuột cống"]);

    const [newName, setNewName] = useState("");

    //load dữ liệu từ LocalStorage 
    useEffect(() => {
        const data = localStorage.getItem("listChuot");
        if (data) setListChuot(JSON.parse(data));
    }, []);

    function addList() {
        if (!newName) return;
        const update = [...listChuot, newName];
        setListChuot(update);
        localStorage.setItem("listChuot", JSON.stringify(update));
        setNewName("");
    }

    function removeList(indexRemove) {
        const list = listChuot.filter(
            (item, index) => index !== indexRemove
        );
        setListChuot(list);
        localStorage.setItem("listChuot", JSON.stringify(list));
    }
    return (
        <div>
            <h3>Đây là gia đình chuột (List)</h3>
            {listChuot.map((item, index) => (
                <div key={index}>
                    <span>{item}</span>
                    <button
                        onClick={() => removeList(index)}
                        style={{ background: "none", color: "red", border: "none", cursor: "pointer" }}
                        title="Xóa"
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nhập tên chuột"
            />
            <button onClick={addList}>Thêm chuột</button>
        </div>
    );
}


export { DisplayList };