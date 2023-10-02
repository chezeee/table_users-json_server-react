import { useState } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';

export default function OnMountFetch({
  config: { API, columns, fetchWrapper },
  ComponentName,
  isActive = '_',
  onClick,
  hideInfoWindow,
}) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
      API,
      fetchWrapper
    ),
    [sortDirection, setSortDirection] = useState(null),
    [editedId, setEditedId] = useState(null),
    [values, setValues] = useState(columns.map(() => ''));

  function setNewValues(values) {
    setValues(values);
  }

  async function dataUpdateFn(event) {
    const eventSource = event.target.closest('button[data-id][data-action]');
    if (eventSource) {
      const { id, action } = eventSource.dataset;
      let optimisticData;
      const promise = (() => {
        switch (action) {
          case 'delete':
            optimisticData = data.filter((el) => String(el.id) !== String(id));
            return fetch(API + id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(async (res) => {
              if (!res.ok) {
                throw new Error(res.status + '' + res.statusText);
              }
            });
          case 'ok':
            setEditedId(null);
            if (editedId) {
              // edit
              const index = data.findIndex(
                  (obj) => String(obj.id) === String(editedId)
                ),
                newObj = { ...data[index] };
              columns.forEach(({ setDataVal }, i) =>
                Object.assign(newObj, setDataVal?.(values[i]))
              );
              optimisticData = data.with(index, newObj);
              setValues(columns.map(() => ''));
              return fetch(API + editedId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObj),
              }).then(async (res) => {
                if (!res.ok) {
                  throw new Error(res.status + ' ' + res.statusText);
                }
              });
            } else {
              // add
              const newObj = { id: Math.random(), address: {}, company: {} };
              columns.forEach(({ setDataVal }, index) =>
                Object.assign(newObj, setDataVal?.(values[index]))
              );
              optimisticData = data.concat(newObj);
              setValues(columns.map(() => ''));
              return fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObj),
              }).then(async (res) => {
                if (!res.ok) {
                  throw new Error(res.status + ' ' + res.statusText);
                }
              });
            }
        }
      })();
      if (promise) {
        toast.promise(promise, {
          loading: 'Request in progress...' + action,
          success: 'Done!',
          error: (err) => `${err.toString()}`,
        });
        await mutate(promise.then(fetchWrapper, fetchWrapper), {
          optimisticData,
          populateCache: true,
          revalidate: false,
        });
      }
      switch (action) {
        case 'info':
          onClick(id);
          return;
        case 'post':
          onClick();
          return;
        case 'edit':
          setEditedId(id);
          const index = data.findIndex((obj) => String(obj.id) === String(id));
          setValues(
            columns.map(({ setDataVal, getDataVal }) =>
              setDataVal ? getDataVal(data[index]) : ''
            )
          );
          hideInfoWindow();
          return;

        case 'cancel':
          setEditedId(null);
          setValues(columns.map(() => ''));
          hideInfoWindow();
          return;
      }
      return;
    }
    const th = event.target.closest('thead th');
    if (th) {
      let newSortNumber;
      if (Math.abs(sortDirection) === 1 + th.cellIndex) {
        newSortNumber = -sortDirection;
      } else {
        newSortNumber = 1 + th.cellIndex;
      }
      setSortDirection(newSortNumber);
    }
  }

  return (
    <>
      <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
        {isLoading && <>⌛️</>}
        {isValidating && <>👁️</>}
      </div>
      {error && <>Error {error.toString()}</>}
      {data && isActive && (
        <ComponentName
          data={data}
          dataUpdateFn={dataUpdateFn}
          sortDirection={sortDirection}
          columns={columns}
          editedId={editedId}
          setValues={setNewValues}
          editedValues={values}
        />
      )}
    </>
  );
}
