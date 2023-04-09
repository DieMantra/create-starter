import { useRef, useState } from 'react';
import LinkItem from '../Link';
import styles from './NavList.module.css';
interface NavList {
	links: string[];
}

function NavList({ links }: NavList) {
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [currentElSize, setCurrentElSize] = useState({
		height: 0,
		width: 0,
	});
	const unordedListRef = useRef<HTMLUListElement>(null);

	const handleMouseHover = (
		e: React.MouseEvent<HTMLUListElement, MouseEvent>
	) => {
		const currentTarget = e.currentTarget;
		const activeElement = e.target as HTMLLIElement;
		if (
			activeElement.id === 'highlighter' ||
			activeElement.parentElement!.id === 'unorderdList'
		)
			return;

		const realElement: HTMLElement =
			activeElement.parentElement! === currentTarget!
				? activeElement
				: activeElement.parentElement!;

		const indexOfActiveElement = Array.from(
			unordedListRef.current?.children || []
		).indexOf(realElement);

		setCurrentElSize({
			width: realElement.clientWidth,
			height: realElement.clientHeight,
		});
		setCurrentIndex(indexOfActiveElement);
	};

	const leftPosition =
		unordedListRef.current?.children[currentIndex!] &&
		(unordedListRef.current?.children[currentIndex!] as HTMLElement).offsetLeft;

	const pos = leftPosition! + currentElSize.width / 2;

	return (
		<ul
			id='unorderdList'
			ref={unordedListRef}
			className={styles.unorderdList}
			onMouseMove={handleMouseHover}
			onMouseLeave={() => setCurrentIndex(null)}
		>
			<div
				id='highlighter'
				style={{
					opacity: currentIndex === null ? 0 : 100,
					width: `${
						currentIndex === null
							? currentElSize.width / 2
							: currentElSize.width + 2
					}px`,
					height: `${currentIndex === null ? 0 : currentElSize.height + 2}px`,
					left: `${pos}px`,
				}}
				className={styles.elementHighlighter}
			/>
			{links.map((link, i) => (
				<LinkItem key={link} link={link} isActive={currentIndex === i} />
			))}
		</ul>
	);
}
export default NavList;
