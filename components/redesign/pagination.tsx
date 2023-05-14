import { useMemo } from 'react';

export default function Pagination({ currentPage, pageChange, pageSize, dataSize, noPages }) {
    if (noPages) {
        return null;
    }
    
    const totalPages = Math.ceil(dataSize / pageSize);

    function pageNext() {
        if (currentPage < totalPages) {
            pageChange(currentPage + 1);
        }
    }

    function pagePrev() {
        if (currentPage > 1) {
            pageChange(currentPage - 1);
        }
    }

    return (
        <div style={{margin: '2rem auto 0', width: '20rem', textAlign: 'center'}}>
            current page: {currentPage}/{totalPages}
            <br /><br />
            <button onClick={() => pageChange(1)}>first</button>
            <button onClick={() => pagePrev()}>prev</button>
            <button onClick={() => pageNext()}>next</button>
            <button onClick={() => pageChange(totalPages)}>last</button>
        </div>
    );
};