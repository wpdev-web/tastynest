export default function Input({ label, Id, ...props }) {
  return (
    <p className="control">
      <label htmlFor={Id}>{label}</label>
      <input id={Id} name={Id} required {...props} />
    </p>
  );
}