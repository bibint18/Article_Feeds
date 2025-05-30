// import React from 'react';

// interface SelectFieldProps {
//   label: string;
//   name: string;
//   value: string[];
//   options: string[];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, options, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700">{label}</label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         multiple
//         className="w-full p-2 border rounded"
//       >
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectField;


import React from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string[];
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, options, onChange, error }) => {
  return (
    <div className="mb-5">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        multiple
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default SelectField;