interface Props {
  column: string[];
  row: string[][];
}

export default function Table({ column, row }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          {column.map((el) => {
            return <th>{el}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {row.map((el, index) => (
          <tr key={index}>
            {el.map((e) => (
              <td>{e}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
