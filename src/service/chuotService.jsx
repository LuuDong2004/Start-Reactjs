import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";



function DisplayList() {
    const [listChuot, setListChuot] = useState(["Chuột nhắt", "Chuột đồng", "Chuột cống"]);

    const [newName, setNewName] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    //load dữ liệu từ LocalStorage 
    useEffect(() => {
        const data = localStorage.getItem("listChuot");
        if (data) {
            setListChuot(JSON.parse(data));
        } else {
            setListChuot(["Chuột nhắt", "Chuột đồng", "Chuột cống"]);
        }
    }, []);


    // add new chuột vào list
    function AddList() {
        if (!newName) return;
        const update = [...listChuot, newName];
        setListChuot(update);
        localStorage.setItem("listChuot", JSON.stringify(update));
        setNewName("");
    }


    // remove chuột khỏi list
    function RemoveList(indexRemove) {
        const list = listChuot.filter(
            (item, index) => index !== indexRemove
        );
        setListChuot(list);
        localStorage.setItem("listChuot", JSON.stringify(list));
    }

    // rename chuột trong list
    function Rename() {
        if (!editValue.trim()) return;

        const list = listChuot.map((item, i) =>
            i === editIndex ? editValue : item
        );

        setListChuot(list);
        localStorage.setItem("listChuot", JSON.stringify(list));
        setShowModal(false);
    }
    return (
        <div>
            <h3>Đây là gia đình chuột (List)</h3>
            {listChuot.map((item, index) => (
                <div key={index}>
                    <span>{item}</span>
                    <button
                        onClick={() => RemoveList(index)}
                        style={{ background: "none", color: "red", border: "none", cursor: "pointer" }}
                        title="Xóa"
                    >
                        <FaTrash />
                    </button>

                    <button
                        onClick={() => {
                            setEditIndex(index);
                            setEditValue(item);
                            setShowModal(true);
                        }}
                         style={{ background: "none", border: "none", cursor: "pointer" }}
                        title="Sửa"
                    >
                        <FaEdit />
                    </button>

                </div>
            ))}
            <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nhập tên chuột"
            />
            <button onClick={AddList}>Thêm chuột</button>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Đổi tên chuột</h3>
                        <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                        />

                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)}>Hủy</button>
                            <button onClick={Rename}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export { DisplayList };