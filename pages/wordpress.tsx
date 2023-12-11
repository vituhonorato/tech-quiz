import React, { useState } from 'react';
import quizDataWordpress from '@/utils/quizzDataWordpress';
import Layout from '@/components/Layout';



function WordpressScreen() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const handleAnswerClick = (optionId:any) => {
    setSelected(optionId);
  };

  const handleNextQuestion = () => {
    if (selected === quizDataWordpress[currentQuiz].correct) {
      setScore(score + 1);
    }
    setSelected(null);
    setCurrentQuiz(currentQuiz + 1);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setSelected(null);
  };

  return (
    <Layout title='Java'>
       <div className="h-screen">
      {currentQuiz < quizDataWordpress.length ? (
        <div className='flex flex-col text-center mx-auto max-w-screen-md bg-white bg-opacity-80  rounded-sm p-6'>
          <h2 className='text-lg lg:text-xl font-semibold mb-4'>Questão {currentQuiz + 1}</h2>
          <p className='text-lg lg:text-xl mb-6 mt-4'>{quizDataWordpress[currentQuiz].question}</p>
          <div className=''>{quizDataWordpress[currentQuiz].image}</div>
          <ul className='flex flex-col text-left'>
            {quizDataWordpress[currentQuiz].options.map((option) => (
              <li className='' key={option.id}>
                <label className='space-y-12'>
                  <input
                  className='m-4'
                    type="radio"
                    name="answer"
                    value={option.id}
                    checked={selected === option.id}
                    onChange={() => handleAnswerClick(option.id)}
                  />
                  {option.text}
                </label>
              </li>
            ))}
          </ul>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-14' onClick={handleNextQuestion}>Responder</button>
        </div>
      ) : (
        <div>
          <h2>You answered {score}/{quizDataWordpress.length} questions correctly</h2>
          <button onClick={resetQuiz}>Reload</button>
        </div>
      )}
    </div>
    </Layout>
   
  );
}

export default WordpressScreen;
WordpressScreen.auth=true;