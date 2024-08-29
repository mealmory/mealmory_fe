import { PRIVACY_TEXT } from "@/constants/service";

const PrivacyDocument = () => {
  return (
    <ul>
      {PRIVACY_TEXT.step.map(({ subTitle, content }, i) => (
        <li key={subTitle} className="mb-3">
          <p className="text-xl">{i + 1 + ". " + subTitle}</p>
          <ul className="ml-3">
            {content.map(
              ({
                value,
                children,
              }: {
                value: string;
                children?: {
                  summaryWord: string;
                  value: string;
                }[];
              }) => (
                <li key={value}>
                  <p>{value}</p>
                  {children && (
                    <ul className="list-disc ml-3">
                      {children.map((item) => (
                        <li key={item.value}>
                          <span className="point-value">
                            {item.summaryWord}
                          </span>{" "}
                          : {value}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default PrivacyDocument;
