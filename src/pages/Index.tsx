
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { QuizConfig } from "@/components/QuizConfig";
import { Question } from "@/components/Question";
import { Results } from "@/components/Results";
import { useQuiz } from "@/hooks/useQuiz";
import { SEOHead } from "@/components/SEOHead";
import { SitemapLinks } from "@/components/SitemapLinks";
import { GoogleAd } from "@/components/GoogleAd";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, updateConfig, startQuiz, answerQuestion, resetQuiz } = useQuiz();

  useEffect(() => {
    // Read config from URL parameters on initial load
    const amount = searchParams.get('amount');
    const categoryName = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    if (amount && categoryName && difficulty) {
      updateConfig({
        amount: parseInt(amount),
        categoryName: categoryName,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
      });
    }
  }, [searchParams, updateConfig]);

  const startQuizWithUrlUpdate = () => {
    // Update URL parameters when starting the quiz
    setSearchParams({
      amount: state.config.amount.toString(),
      category: state.config.categoryName,
      difficulty: state.config.difficulty,
    });
    startQuiz();
  };

  // Handle answer and refresh ad
  const handleAnswer = (answer: string) => {
    answerQuestion(answer);
  };

  return (
    <div className="container mx-auto px-4">
      <SEOHead
        title="Generate Trivia - Your Ultimate Trivia Question Generator"
        description="Create engaging trivia questions across various categories and difficulty levels. Perfect for quiz nights, educational activities, or casual learning."
        canonicalUrl={searchParams.toString() ? `/?${searchParams.toString()}` : '/'}
      />
      
      <Header />
      
      {/* Hidden sitemap links for SEO */}
      <SitemapLinks />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        {state.status === 'idle' && (
          <>
            <QuizConfig
              config={state.config}
              onConfigChange={updateConfig}
              onStart={startQuizWithUrlUpdate}
            />
            {/* Place ad after quiz config */}
            <div className="w-full mt-8" dangerouslySetInnerHTML={{ __html: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8823992623303024" data-ad-slot="7080403920" data-ad-format="auto" data-full-width-responsive="true"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({});</script>' }}>
            </div>
          </>
        )}

        {state.status === 'loading' && (
          <div className="text-center py-10">Loading questions...</div>
        )}

        {state.status === 'active' && state.questions.length > 0 && (
          <>
            <Question
              question={state.questions[state.currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
            <div className="w-full mt-8" dangerouslySetInnerHTML={{ __html: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8823992623303024" data-ad-slot="7080403920" data-ad-format="auto" data-full-width-responsive="true"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({});</script>' }}>
            </div>
          </>
        )}

        {state.status === 'completed' && state.questions.length > 0 && (
          <>
            <Results
              questions={state.questions}
              score={state.score}
              onReset={resetQuiz}
              onPlayAgain={() => startQuiz()}
            />
            <div className="w-full mt-8" dangerouslySetInnerHTML={{ __html: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8823992623303024" data-ad-slot="7080403920" data-ad-format="auto" data-full-width-responsive="true"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({});</script>' }}>
            </div>
          </>
        )}
      </div>
      
      {/* Add an extra ad at the bottom of the page */}
      <div className="w-full mt-8" dangerouslySetInnerHTML={{ __html: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8823992623303024" data-ad-slot="7080403920" data-ad-format="auto" data-full-width-responsive="true"></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({});</script>' }}>
            </div>
    </div>
  );
}
