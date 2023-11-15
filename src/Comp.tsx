import { PubSub } from "aws-amplify";
import { useEffect, useState } from "react";

export default function Comp() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<(string | Record<string, unknown>)[]>(
    []
  );

  const subscribe = async () => {
    try {
      const subscription = PubSub.subscribe("topic", {
        provider: "AWSIoTProvider",
      }).subscribe({
        next: (data) => {
          console.log(data);
          setHistory((prev) => [...prev, data.value]);
        },
        error: (error) => console.error(error),
        complete: () => console.log("Done"),
      });
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Error getting credentials", error);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => {
      unsubscribe.then((s) => s?.());
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={() => {
          PubSub.publish("topic", { msg: message });
        }}
      >
        Publish
      </button>
      <div>
        {history.map((h, i) => (
          <p key={i}>{JSON.stringify(h)}</p>
        ))}
      </div>
    </div>
  );
}
