import css from './DataTable.module.css';
import ActionBtn from './ActionBtn';
import { useState, Fragment } from 'react';

export default function DataTable({
  users,
  dataUpdateFn,
  sortDirection,
  columns,
  hideInfoWindow,
  editedId,
  children,
}) {
  const [filterStr, setFilterStr] = useState('');

  function filterDataFn(elem) {
    if (!filterStr) return true;
    return columns
      .map(({ getDataVal }) => getDataVal(elem))
      .filter((x) => 'string' === typeof x)
      .some((x) => x.toLowerCase().includes(filterStr.toLowerCase()));
  }

  function sortDataFn(a, b) {
    if (!sortDirection) return 1;
    const { getDataVal } = columns[Math.abs(sortDirection) - 1];
    if (!getDataVal) return 1;
    return 'string' === typeof getDataVal(a)
      ? Math.sign(sortDirection) * getDataVal(a).localeCompare(getDataVal(b))
      : 1;
  }

  return (
    <>
      <div className={css.tableWrapper}>
        <input
          className={css.searchForm}
          value={filterStr}
          onInput={(event) => {
            setFilterStr(event.target.value);
            hideInfoWindow();
          }}
          placeholder="Start typing to search"
        />
        <table>
          <thead className={css.tHeadStyle}>
            <tr>
              {columns.map(({ title }, index) => (
                <th
                  key={title}
                  onClick={dataUpdateFn}
                  className={[
                    index === Math.abs(sortDirection) - 1 ? css.sort : '',
                    index === Math.abs(sortDirection) - 1 && sortDirection < 0
                      ? css.desc
                      : '',
                  ].join(' ')}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={css.tBodyStyle}>
            {users
              ?.filter(filterDataFn)
              ?.toSorted(sortDataFn)
              .map((user) => (
                <Fragment key={user.id}>
                  {String(user.id) === String(editedId) ? (
                    <>{children}</>
                  ) : (
                    <tr key={user.id}>
                      {columns.map(({ title, getFullData }) => (
                        <td key={title}>{getFullData(user)}</td>
                      ))}
                      <td>
                        <ActionBtn
                          text="ℹ️"
                          id={user.id}
                          action={'info'}
                          onClick={dataUpdateFn}
                        />
                        <ActionBtn
                          text="✏️"
                          id={user.id}
                          action={'edit'}
                          onClick={dataUpdateFn}
                        />
                        <ActionBtn
                          text="❌"
                          id={user.id}
                          action={'delete'}
                          onClick={dataUpdateFn}
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
          </tbody>
          {!editedId && <tfoot className={css.editForm}>{children}</tfoot>}
        </table>
      </div>
    </>
  );
}
