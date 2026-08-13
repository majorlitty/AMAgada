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

    # The file starts with "use client";
    content = content.replace('"use client";', '"use client";\n' + imports)

    with open(f_path, 'w') as f:
        f.write(content)

    print(f"Fixed imports for {f_path}")

