import Animated from 'components/animations';
import { ContentText, RoundedButton } from 'components/atoms';
import { SectionTitle } from 'components/molecules';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';
import AboutSectionProps from 'components/organisms/About/types';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function About({ title, content, className }: AboutSectionProps) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const language = useContext(LanguageContext);

  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);

  return (
    <section id="about" className={className} ref={ref}>
      <SectionTitle
        lineProps={{
          animate: controls,
          custom: 1,
          transition: {
            delay: 1,
          },
        }}
      >
        <Animated.Letter text={title} animate={controls} custom={0} delay={1} />
      </SectionTitle>
      <div className="grid grid-rows-2 mt-6 lg:grid-cols-3 lg:grid-rows-1">
        <Animated.FromDirection
          className="lg:col-span-2"
          from="left"
          animate={controls}
          custom={0}
          delay={1}
        >
          <Animated.Reveal from="left" animate={controls} custom={1} delay={1}>
            <ContentText className="lg:text-left">{content.text}</ContentText>
          </Animated.Reveal>
        </Animated.FromDirection>
        <div className="mx-auto mt-6 lg:mr-0 lg:ml-auto lg:mt-0">
          <Animated.FromDirection from="bottom" animate={controls} custom={1} delay={1}>
            <RoundedButton>{language.value === 'en' ? 'Download' : 'Unduh'} CV</RoundedButton>
          </Animated.FromDirection>
        </div>
      </div>
    </section>
  );
}
