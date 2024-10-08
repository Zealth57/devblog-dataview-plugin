import {DataViews, filterSortAndPaginate} from "@wordpress/dataviews";
import {useState} from "@wordpress/element";

import "./index.scss";
import {COUNCILS, PROVINCES} from "./data";

const formatNumber = (number) => new Intl.NumberFormat("en-EN").format(number);

function App() {
    const [data, setData] = useState(COUNCILS);

    const [paginationInfo, setPaginationInfo] = useState({
        totalItems: 0,
        totalPages: 0,
    });
    const defaultLayouts = {
        table: {
            layout: {
                primaryField: "name",
                primaryKey: 'test'
            },
        },
    };
    const [view, setView] = useState({
        type: "table",
        perPage: 10,
        layout: defaultLayouts.table.layout,
    });

    const fields = [
        {
            id: "img_src",
            header: "Image",
            render: ({item}) => (
                <a title={item.img_author} href={item.img_url}>
                    <img width="50" alt={""} src={item.img_src}/>
                </a>
            ),
            enableSorting: false,
        },
        {
            id: "name",
            header: "Name",
            enableGlobalSearch: true,
        },
        {
            id: "province",
            header: "Province",
            enableGlobalSearch: true,
            elements: PROVINCES,
        },
        {
            id: "population",
            header: "Population",
            render: ({item}) => formatNumber(item.population),
        },
        {
            id: "km_2",
            header: "Area (km²)",
            render: ({item}) => formatNumber(item.km_2),
        },
    ];

    const onChangeView = (newView) => {
        const {data: newData, paginationInfo: newPaginationInfo} =
            filterSortAndPaginate(COUNCILS, newView, fields);
        setView(newView);
        setData(newData);
        setPaginationInfo(newPaginationInfo);
    };

    return (
        <DataViews
            data={data}
            fields={fields}
            view={view}
            onChangeView={onChangeView}
            defaultLayouts={defaultLayouts}
            paginationInfo={paginationInfo}
        />
    );
}

export default App;
