import re

files = {
    'app/page.tsx': """import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, animate, useInView, AnimatePresence } from "motion/react";
""",
    'app/our-story/page.tsx': """import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
""",
    'app/contact/page.tsx': """import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
"""
}

for f_path, imports in files.items():
    with open(f_path, 'r') as f:
        content = f.read()

    # Remove everything between "use client"; and the first function/export
    # Be careful not to remove any components like function AnimatedCounter
    content = re.sub(r'"use client";.*?((?:function |export default function ))', '"use client";\n' + imports + '\n\\1', content, flags=re.DOTALL)

    with open(f_path, 'w') as f:
        f.write(content)

    print(f"Fixed imports again for {f_path}")

