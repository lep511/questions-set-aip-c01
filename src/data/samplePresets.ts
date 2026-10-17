import { RawQuestion } from '../types';

export const SAMPLE_ML_EXAM_JSON: RawQuestion[] = [
  {
    "question": "Which of the following activation functions is most commonly used in hidden layers of modern deep neural networks to prevent vanishing gradients while maintaining computational efficiency?",
    "options": [
      {
        "id": "A",
        "text": "Sigmoid (Logistic)",
        "explanation": "Sigmoid saturates for large positive or negative values, causing its derivative to approach zero and resulting in vanishing gradients in deep networks."
      },
      {
        "id": "B",
        "text": "Rectified Linear Unit (ReLU)",
        "explanation": "ReLU (max(0, x)) computes quickly with simple thresholding and does not saturate in the positive region, effectively mitigating vanishing gradient issues."
      },
      {
        "id": "C",
        "text": "Hyperbolic Tangent (Tanh)",
        "explanation": "Tanh is zero-centered but still suffers from gradient saturation at extreme values, causing vanishing gradients in deep architectures."
      },
      {
        "id": "D",
        "text": "Softmax",
        "explanation": "Softmax is typically used in the final output layer for multiclass probability distribution rather than intermediate hidden layers."
      }
    ],
    "correct_answer": "B",
    "category": "Deep Learning"
  },
  {
    "question": "A data scientist observes that a model achieves 99% accuracy on training data but drops to 68% accuracy on unseen validation data. Which two techniques will directly help reduce overfitting?\n\n(Select TWO)",
    "options": [
      {
        "id": "A",
        "text": "Apply L1/L2 regularization (weight decay) or Dropout during training.",
        "explanation": "Regularization penalizes large weight magnitudes and Dropout randomly deactivates neurons, preventing co-adaptation and reducing overfitting."
      },
      {
        "id": "B",
        "text": "Increase the number of layers and total trainable parameters in the model.",
        "explanation": "Increasing model capacity often increases the risk of overfitting by memorizing training noise."
      },
      {
        "id": "C",
        "text": "Implement data augmentation techniques to introduce realistic variations into the training set.",
        "explanation": "Data augmentation expands the effective training distribution, forcing the model to learn invariant, generalized features."
      },
      {
        "id": "D",
        "text": "Remove early stopping and increase the number of training epochs to 500.",
        "explanation": "Training for excessive epochs without early stopping causes the model to fit training noise more closely."
      }
    ],
    "correct_answer": ["A", "C"],
    "category": "Model Regularization"
  }
];

export const SAMPLE_WEB_EXAM_JSON: RawQuestion[] = [
  {
    "question": "In React 18 and 19, what is the primary purpose of the useMemo hook?",
    "options": [
      {
        "id": "A",
        "text": "To trigger side effects after the component renders into the DOM.",
        "explanation": "Side effects after DOM rendering are handled by useEffect or useLayoutEffect."
      },
      {
        "id": "B",
        "text": "To memoize the result of an expensive calculation so it is only recomputed when dependencies change.",
        "explanation": "useMemo caches calculation results between re-renders based on a specified dependency array."
      },
      {
        "id": "C",
        "text": "To persist a mutable value that does not cause a component re-render when mutated.",
        "explanation": "Persisting mutable values without re-rendering is the role of useRef."
      },
      {
        "id": "D",
        "text": "To share state globally without passing props down manually through component trees.",
        "explanation": "Sharing state without prop-drilling is accomplished using React Context or state management stores."
      }
    ],
    "correct_answer": "B",
    "category": "React & Frontend"
  }
];
