# Contributing to Moove

Thank you for your interest in contributing to Moove! This document provides guidelines and instructions for contributing to the project.

## 🎯 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, Python version)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:
- Clear description of the feature
- Use cases and benefits
- Any relevant mockups or examples

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/moove.git
   cd moove
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   # Backend tests
   cd backend
   pytest
   
   # Frontend tests
   npm run test
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug in component"
   ```

   Use conventional commit messages:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with details

## 💻 Development Setup

### Prerequisites
- Node.js 20+
- Python 3.12+
- Git

### Local Setup
See [README.md](README.md) for detailed setup instructions.

### Development Workflow

1. **Backend Development**
   ```bash
   cd backend
   source venv/bin/activate  # or .\venv\Scripts\Activate.ps1
   uvicorn app.main:app --reload --port 8000
   ```

2. **Frontend Development**
   ```bash
   npm run dev
   ```

3. **Database Migrations**
   ```bash
   cd backend
   alembic revision --autogenerate -m "description"
   alembic upgrade head
   ```

## 📋 Code Style

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Keep functions focused and small
- Use meaningful variable names

Example:
```python
def calculate_timeline_duration(
    phases: List[TimelinePhase],
    risk_factor: float = 1.0
) -> int:
    """Calculate total duration of a migration timeline.
    
    Args:
        phases: List of timeline phases
        risk_factor: Multiplier for duration (default 1.0)
        
    Returns:
        Total duration in months
    """
    return sum(phase.duration_months * risk_factor for phase in phases)
```

### TypeScript (Frontend)
- Use TypeScript for all new code
- Define interfaces for props and data structures
- Use functional components with hooks
- Keep components small and reusable
- Use meaningful component and variable names

Example:
```typescript
interface TimelinePhaseProps {
  phase: Phase;
  onExpand: (phaseId: string) => void;
}

export function TimelinePhase({ phase, onExpand }: TimelinePhaseProps) {
  // Component implementation
}
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/
pytest --cov=app tests/  # with coverage
```

### Frontend Tests
```bash
npm run test
npm run test:coverage
```

### Writing Tests
- Write tests for all new features
- Aim for >80% code coverage
- Test edge cases and error handling
- Use descriptive test names

## 📚 Documentation

When adding features:
- Update README.md if needed
- Add inline code comments for complex logic
- Update API documentation for new endpoints
- Add examples in docstrings

## 🐛 Debugging Tips

### Backend
- Use FastAPI's `/docs` endpoint for API testing
- Check logs with `LOG_LEVEL=DEBUG`
- Use `ipdb` for debugging: `import ipdb; ipdb.set_trace()`

### Frontend
- Use React Developer Tools
- Check browser console for errors
- Use Network tab to debug API calls

## 🚀 Release Process

1. All changes go through PR review
2. Maintain CHANGELOG.md
3. Version follows semantic versioning (MAJOR.MINOR.PATCH)
4. Tag releases in Git

## 📞 Getting Help

- Create an issue for questions
- Check existing issues and PRs
- Review [prd.md](prd.md) for product context
- Check [PROGRESS.md](PROGRESS.md) for current status

## 🎉 Recognition

Contributors will be recognized in:
- Repository contributors page
- Release notes
- README acknowledgments (for significant contributions)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards other contributors

## ⚖️ License

By contributing to Moove, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Moove! 🌍**
