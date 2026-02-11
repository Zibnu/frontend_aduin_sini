import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'

import ResorceCard from '../components/ResorceCard'
import AddModal from '../components/AddModal'
import DeleteModal from '../components/DeleteModal'
import toast from 'react-hot-toast'

function ManageResource() {
    const [classes, setClasses] = useState([]);
    const [rooms, setRoom] = useState([]);
    const [categories, setCategories] = useState([]);

    const [addType, setAddType] = useState(null);
    const [deleteData, setDeleteData] = useState(null);

    const fetchData = async () => {
        try {
            const [classRes, roomRes, catRes] = await Promise.all([
                apiServices.get("/class/get_allClass"),
                apiServices.get("/room/get_all_room"),
                apiServices.get("/category/get_all_category")
            ]);

            setClasses(
                classRes.data.data.map((c) => ({
                    ...c,
                    id : c.id_class,
                }))
            );

            setRoom(
                roomRes.data.data.map((r) => ({
                    ...r,
                    id : r.id_room,
                }))
            );

            setCategories(
                catRes.data.data.map((cat) => ({
                    ...cat,
                    id : cat.id_category,
                }))
            );
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Class, Room and Category");
        }
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <ResorceCard
            title="Class List"
            type="class"
            data={classes}
            displayKey="nama_kelas"
            onAdd={setAddType}
            onDelete={(type,item) => setDeleteData({type, item})}
            />

            <ResorceCard
            title="Room List"
            type="room"
            data={rooms}
            displayKey="nama_ruang"
            onAdd={setAddType}
            onDelete={(type,item) => setDeleteData({type, item})}
            />

            <div className="md:col-span-2">
            <ResorceCard
            title="Category List"
            type="category"
            data={categories}
            displayKey="nama_kategori"
            onAdd={setAddType}
            onDelete={(type,item) => setDeleteData({type, item})}
            />
            </div>

            <AddModal
            open={!!addType}
            type={addType}
            onClose={() => setAddType(null)}
            onSuccess={fetchData}
            />

            <DeleteModal
            open={!!deleteData}
            type={deleteData?.type}
            item={deleteData?.item}
            onClose={() => setDeleteData(null)}
            onSuccess={fetchData}
            />
        </div>
    )
}

export default ManageResource