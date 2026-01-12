// import { useEffect, useState } from "react";

// const emptyMouse = {
//   name: "",
//   gender: "",
//   image: ""
// };  

// export default function MousePage() {
//   const [mice, setMice] = useState([]);
//   const [form, setForm] = useState(emptyMouse);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadMice();
//   }, []);

//   const loadMice = async () => {
//     const res = await authAxios.get("/rest/entities/Mouse");
//     setMice(res.data);
//   };

//   const onChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submit = async e => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (editingId) {
//         await authAxios.put(`/rest/entities/Mouse/${editingId}`, form);
//       } else {
//         await authAxios.post("/rest/entities/Mouse", form);
//       }

//       setForm(emptyMouse);
//       setEditingId(null);
//       loadMice();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const edit = mouse => {
//     setEditingId(mouse.id);
//     setForm({
//       name: mouse.name ?? "",
//       gender: mouse.gender ?? "",
//       image: mouse.image ?? ""
//     });
//   };

//   const remove = async id => {
//     if (!window.confirm("Xóa chuột này?")) return;
//     await authAxios.delete(`/rest/entities/Mouse/${id}`);
//     loadMice();
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>🐭 Quản lý Chuột</h2>
//       <form onSubmit={submit} style={{ marginBottom: 24 }}>
//         <input
//           name="name"
//           placeholder="Tên chuột"
//           value={form.name}
//           onChange={onChange}
//           required
//         />
//         <input
//           name="gender"
//           placeholder="Giới tính"
//           value={form.gender}
//           onChange={onChange}
//         />
//         <input
//           name="image"
//           placeholder="URL hình ảnh"
//           value={form.image}
//           onChange={onChange}
//         />

//         <button type="submit" disabled={loading}>
//           {editingId ? "Cập nhật" : "Thêm"}
//         </button>

//         {editingId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingId(null);
//               setForm(emptyMouse);
//             }}
//           >
//             Hủy
//           </button>
//         )}
//       </form>

//       {/* LIST */}
//       <table border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>Tên</th>
//             <th>Giới tính</th>
//             <th>Hình</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mice.map(mouse => (
//             <tr key={mouse.id}>
//               <td>{mouse.name}</td>
//               <td>{mouse.gender}</td>
//               <td>
//                 {mouse.image && (
//                   <img src={mouse.image} width="60" alt="" />
//                 )}
//               </td>
//               <td>
//                 <button onClick={() => edit(mouse)}>Sửa</button>
//                 <button onClick={() => remove(mouse.id)}>Xóa</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
