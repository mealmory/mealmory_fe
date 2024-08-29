import { SERVICE_TEXT } from "@/constants/service";

const ServiceDocument = () => {
  return (
    <ul>
      {SERVICE_TEXT.step.map(({ subTitle, content }) => (
        <li key={subTitle} className="mb-3">
          <p className="text-xl">{subTitle}</p>
          <ul className="ml-3">
            {content.map(({ value, children }) =>
              !children ? (
                <li key={value}>{value}</li>
              ) : (
                <ul key={value} className="list-disc ml-3">
                  {children.map(({ value: childrenValue }) => (
                    <li key={childrenValue}>{childrenValue}</li>
                  ))}
                </ul>
              )
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ServiceDocument;
